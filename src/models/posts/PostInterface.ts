import { PostStatus } from "./PostStatus";

export interface PostSummaryInterface {
    id: number
    title: string
    slug: string
    timeCreated: string
}

export interface PostInterface extends PostSummaryInterface {
    categoryId: number
    content: string
    status: PostStatus
    allowComments: boolean
    timeUpdated: string
}