import { PostStatus } from "./PostStatus";

export interface PostSummaryInterface {
    id: number
    title: string
    content: string
    slug: string
    timeCreated: string
}

export interface PostInterface extends PostSummaryInterface {
    categoryId: number
    status: PostStatus
    allowComments: boolean
    timeUpdated: string
}