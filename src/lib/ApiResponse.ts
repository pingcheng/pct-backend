export interface ApiResponsePayload {
  [x: string]: any
}

export interface ApiResponseObject {
  data: ApiResponsePayload,
  message: string
}

export class ApiResponse {
  private payload: ApiResponsePayload
  private message: string = ''

  constructor () {
    this.payload = {}
    this.message = ''
  }

  public static with (payload: ApiResponsePayload|null, message: string|null = null): ApiResponseObject {
    const response = new ApiResponse()

    if (response.payload !== null) {
      response.setPayload(payload)
    }

    if (message !== null) {
      response.setMessage(message)
    }

    return response.toObject()
  };

  public setPayload (payload: ApiResponsePayload) {
    this.payload = payload
  }

  public setMessage (message: string) {
    this.message = message.trim()
  }

  public toObject (): ApiResponseObject {
    return {
      data: this.payload,
      message: this.message
    }
  }
}
