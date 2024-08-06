import { Client } from "@gradio/client";

interface PredictParams {
  model: File;
  garment: File;
  garmentDescription?: string;
}

interface PredictResponse {
  url: string;
}

export interface ValidateError {
  message: string;
  code: "INVALID_MODEL" | "INVALID_GARMENT";
}

interface ValidateErrorResponse {
  errors: ValidateError[];
}

interface ValidateResponse {
  isHuman: boolean;
  isShowingUpperBody: boolean;
  isGarment: boolean;
  isUpperBody: boolean;
  hasHuman: boolean;
}

class IDMVTON {
  #_MODEL_ID = "tuan2308/IDM-VTON";

  async #_validate({
    model,
    garment,
  }: {
    model: File;
    garment: File;
  }): Promise<[null, ValidateErrorResponse] | [ValidateResponse, null]> {
    const fd = new FormData();
    fd.append("model", model);
    fd.append("garment", garment);

    const res = await fetch(import.meta.env.VITE_API_URL + "/api/validate", {
      method: "POST",
      body: fd,
    });
    const data = await res.json();

    if (!res.ok) return [null, data as ValidateErrorResponse];

    return [data as ValidateResponse, null];
  }

  async predict({
    model,
    garment,
    garmentDescription,
  }: PredictParams): Promise<
    [null, ValidateError[]] | [[PredictResponse, PredictResponse], null]
  > {
    const [_, error] = await this.#_validate({ model, garment });

    if (error) return [null, error.errors];

    const _model = await Client.connect(this.#_MODEL_ID);
    const result = await _model.predict("/tryon", [
      { background: model, layers: [], composite: null },
      garment,
      garmentDescription ?? "",
      true,
      true,
      30,
      42,
    ]);

    return [result.data, null] as [[PredictResponse, PredictResponse], null];
  }
}

export const idmvton = new IDMVTON();
