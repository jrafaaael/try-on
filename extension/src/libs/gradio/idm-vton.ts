import { Client } from "@gradio/client";

interface PredictParams {
  model: Blob | File | Buffer | string;
  garment: Blob | File | Buffer | string;
  garmentDescription?: string;
}

class IDMVTON {
  #_MODEL_ID = "yisol/IDM-VTON";

  async predict(params: PredictParams) {
    const _model = await Client.connect(this.#_MODEL_ID);
    const result = await _model.predict("/tryon", [
      { background: params.model, layers: [], composite: null },
      params.garment,
      params?.garmentDescription ?? "",
      true,
      false,
      30,
      42,
    ]);

    return result;
  }
}

export const idmvton = new IDMVTON();
