import { WritableSignal } from "@angular/core"

export interface TileContent {
  id: string
  value: number
  question: string
  answer: string
  done?: WritableSignal<boolean>
}

export interface Column {
  title: string
  content: TileContent[]
}
