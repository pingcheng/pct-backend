import { Request, Response } from 'express'
import { ApiResponse } from '../../lib/ApiResponse'
import { Repository } from '../../repositories/Repository'

export class PostTagsController {
  public static async list (req: Request, res: Response): Promise<void> {
    res.send(ApiResponse.with((await Repository.getPostTagsRepository().list())))
  }
}
