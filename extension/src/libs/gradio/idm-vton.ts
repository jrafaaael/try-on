import { Client } from "@gradio/client";

interface PredictParams {
  model: File;
  garment: File;
  garmentDescription?: string;
}

interface PredictResponse {
  url: string;
}

interface ValidateResponse {
  errors: { message: string }[];
}

class IDMVTON {
  #_MODEL_ID = "yisol/IDM-VTON";

  async #_validate({ model }: { model: File }) {
    const fd = new FormData();
    fd.append("model", model);

    const res = await fetch("http://localhost:8787/api/validate/model", {
      method: "POST",
      body: fd,
    });
    const data: ValidateResponse = await res.json();

    if (!res.ok) throw new Error(data?.errors.map((e) => e.message).join("\n"));
  }

  async predict({
    model,
    garment,
    garmentDescription,
  }: PredictParams): Promise<[PredictResponse, PredictResponse]> {
    await this.#_validate({ model });

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

    return result.data as [PredictResponse, PredictResponse];
  }
}

export const idmvton = new IDMVTON();
