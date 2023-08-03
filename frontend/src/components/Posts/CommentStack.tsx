import { createStyles, Text, ActionIcon, rem } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IComment } from "../../types/types";
import { TbX } from "react-icons/tb";
import useBoundStore from "../../store/Store";

const useStyles = createStyles((theme) => ({
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: "5px",
    marginTop:"10px",
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[3]
    }`,
    borderRadius: "5px",
  },
  content: {
    overflow: "hidden",
  },
  itemDragging: {
    boxShadow: theme.shadows.sm,
  },
}));

export default function CommentStack({ comments }: { comments: IComment[] }) {
  const { classes, cx } = useStyles();
  const [state, handlers] = useListState(comments);

  const handleDeleteComment = (id: string) => {
    deleteComment(id);
  };
  const { deleteComment } = useBoundStore((state) => state);
  const items = state.map((item, index) => (
    <Draggable key={item.id} index={index} draggableId={item.id}>
      {(provided, snapshot) => (
        <>
          <div
            className={cx(classes.item, {
              [classes.itemDragging]: snapshot.isDragging,
            })}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Text fz="sm" className={classes.content}>
              {item.content}
            </Text>
            <ActionIcon>
              <TbX size={15} onClick={() => handleDeleteComment(item.id)} />
            </ActionIcon>
          </div>
        </>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) =>
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
      }
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
