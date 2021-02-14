import { PostStatus } from "./PostStatus";

export interface PostSummaryInterface {
    id: number
    title: string
    slug: string
    timeCreated: number
}

export interface PostInterface extends PostSummaryInterface {
    content: string
    status: PostStatus
    allowComments: boolean
    timeUpdated: number
}