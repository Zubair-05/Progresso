import { create } from 'zustand'
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import { database, storage } from '@/appwrite';

interface BoardState {
    board: Board;
    getBoard: () => void;
    setBoardState : (board:  Board) => void;
    updateTodoInDB : (todo : Todo, columnId : TypedColumn) => void;
    searchString : string;
    setSearchString : (searchString : string) => void;
    deleteTask : (taskIndex:number, todoId:Todo, id:TypedColumn) => void;
}


export const useBoardStore = create<BoardState>((set, get) => ({
    board: {
        columns : new Map<TypedColumn, Column>()
    },

    searchString : "",
    setSearchString : (searchString) => set({ searchString }),

    getBoard : async () => {
        const board : Board = await getTodosGroupedByColumn();
        set({ board });
    },

    setBoardState : (board : Board) => set({ board}),

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

 