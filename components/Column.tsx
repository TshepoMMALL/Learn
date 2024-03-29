import { useAppState } from "@/state/AppStateContext";
import { ColumnContainer, ColumnTitle } from "@/styles/styles";
import { isHidden } from "@/utils/isHidden";
import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { AddNewItem } from "./AddNewItem";
import { Card } from "./Card";
import { DragItem } from "./DragItem";
import { useItemDrag } from "./useItemDrag";

interface ColumnProps {
  text: string
  index: number
  id: string
  isPreview?: boolean
}


export const Column = ({ text, index, id, isPreview }: ColumnProps) => {
  const { state, dispatch } = useAppState()
  const ref = useRef<HTMLDivElement>(null)
  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover(item: DragItem) {
      if (item.type === "COLUMN") {
        const dragIndex = item.index
        const hoverIndex = index

        if (dragIndex === hoverIndex) {
          return
        }

        dispatch({ type: "MOVE_LIST", payload: { dragIndex, hoverIndex } })
        item.index = hoverIndex
      } else {
        const dragIndex = item.index
        const hoverIndex = 0
        const sourceColumn = item.columnId
        const targetColumn = id

        if (sourceColumn === targetColumn) {
          return
        }

        dispatch({
          type: "MOVE_TASK",
          payload: { dragIndex, hoverIndex, sourceColumn, targetColumn }
        })

        item.index = hoverIndex
        item.columnId = targetColumn
      }
    }
  })

  const { drag } = useItemDrag({ type: "COLUMN", id, index, text })

  drag(drop(ref))

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(isPreview, state.draggedItem, "COLUMN", id)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {state.lists[index].tasks.map((task, i) => (
        <Card
          id={task.id}
          columnId={id}
          text={task.text}
          key={task.id}
          index={i}
        />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={text =>
          dispatch({ type: "ADD_TASK", payload: { text, listId: id } })
        }
        dark
      />
    </ColumnContainer>
  )
}