import { create } from 'zustand'
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { database, storage, ID } from '@/appwrite';

interface BoardState {
    board: Board;
    getBoard: () => void;

    setBoardState : (board:  Board) => void;

    updateTodoInDB : (todo : Todo, columnId : TypedColumn) => void;
    searchString : string;
    setSearchString : (searchString : string) => void;

    newTaskInput : string;
    setNewTaskInput : (newTaskInput : string) => void;

    newTaskType : TypedColumn;
    setNewTaskType : (newTaskType : TypedColumn) => void;

    addTask : (todo : string, columnId : TypedColumn) => void;
    deleteTask : (taskIndex:number, todoId:Todo, id:TypedColumn) => void;
}


export const useBoardStore = create<BoardState>((set, get) => ({
    board: {
        columns : new Map<TypedColumn, Column>()
    },

    searchString : "",
    newTaskInput : "",
    newTaskType : "todo",

    setNewTaskInput : (input : string) => set({ newTaskInput : input }),
    setNewTaskType : (columnId : TypedColumn) => set({ newTaskType : columnId }),

    setSearchString : (searchString) => set({ searchString }),

    getBoard : async () => {
        const board : Board = await getTodosGroupedByColumn();
        set({ board });
    },

    setBoardState : (board : Board) => set({ board}),

    addTask : async (todo : string, columnId : TypedColumn) => {

        const {$id} = await database.createDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID! ,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID! ,
            ID.unique(),
            {
                title : todo,
                status : columnId,
            }
        )

        set({ newTaskInput : "" });
        
        set((state) => {
            const newColumns : Map<TypedColumn, Column> = new Map(get().board.columns);
            const newTodo : Todo = {
                $id,
                $createdAt : new Date().toISOString(),
                status : columnId,
                title : todo,
            }
            const column = newColumns.get(columnId);
    
            if(!column){
                newColumns.set(columnId, {
                    id : columnId,
                    todos : [newTodo]
                })
            } else {
                newColumns.get(columnId)?.todos.push(newTodo);
            }

            return { board : { columns : newColumns } }
        })
    },

    updateTodoInDB : async (todo : Todo, columnId : TypedColumn) => {
        await database.updateDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID! ,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID! ,
            todo.$id,
            {
                title : todo.title,
                status : columnId
            } 
        )
    },

    deleteTask : async (taskIndex:number, todo:Todo, id:TypedColumn) => {
        const newColumns : Map<TypedColumn, Column> = new Map(get().board.columns);

        newColumns.get(id)?.todos.splice(taskIndex, 1);

        set({ board : { columns : newColumns } });

        if(todo.image){
            await storage.deleteFile(todo.image.bucketId, todo.image.fieldId);
        }

        await database.deleteDocument(
            process.env.NEXT_PUBLIC_DATABASE_ID! ,
            process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID! ,
            todo.$id
        )

    }


}))

 