export interface PaginatedResponseConfig<T> {
  items: Array<T>
  totalItems: number;
  perPage: number;
  currentPage: number;
}

export interface PaginatedResponseObject<T> {
  items: Array<T>
  totalItems: number;
  perPage: number;
  currentPage: number;
  totalPages: number;
}

export class PaginatedResponse<T> {
  private readonly items: Array<T>
  private readonly totalItems: number
  private readonly perPage: number
  private readonly currentPage: number

  public static with (config: PaginatedResponseConfig<any>) {
    return new PaginatedResponse(config).toObject()
  }

  private constructor (config: PaginatedResponseConfig<T>) {
    this.items = config.items
    this.totalItems = config.totalItems
    this.perPage = config.perPage
    this.currentPage = config.currentPage
  }

  public toObject (): PaginatedResponseObject<T> {
    return {
      items: this.items,
      totalItems: this.totalItems,
      perPage: this.perPage,
      currentPage: this.currentPage,
      totalPages: Math.ceil(this.totalItems / this.perPage)
    }
  }
}
