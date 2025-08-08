import { WritableSignal } from "@angular/core"

export interface TileContent {
  id: string
  value: number
  question: string
  answer: string
  done?: WritableSignal<boolean>
  type?: AnswerType
  width?: number
  height?: number
}

export interface Column {
  title: string
  content: TileContent[]
}

export enum AnswerType {
  TEXT = 'text',
  IMAGE = 'image'
}
