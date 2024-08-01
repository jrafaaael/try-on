import { Client } from "@gradio/client";

interface PredictParams {
  model: File;
  garment: File;
  garmentDescription?: string;
}

interface DataResponse {
  url: string;
}

class IDMVTON {
  #_MODEL_ID = "yisol/IDM-VTON";

  async predict(params: PredictParams): Promise<[DataResponse, DataResponse]> {
    const _model = await Client.connect(this.#_MODEL_ID);
    const result = await _model.predict("/tryon", [
      { background: params.model, layers: [], composite: null },
      params.garment,
      params?.garmentDescription ?? "",
      true,
      true,
      30,
      42,
    ]);

    return result.data as [DataResponse, DataResponse];
  }
}

export const idmvton = new IDMVTON();
