"use client"

import React from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "react-beautiful-dnd";
import { XCircleIcon } from '@heroicons/react/24/solid';

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}


const TodoCard = ({ todo, index, id, innerRef, draggableProps, dragHandleProps }: Props) => {
    return (
        <div
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
            className='bg-white rounded-md space-y-2 drop-shadow-md '
        >
            <div className='flex justify-between items-center p-5'>
                <p>{todo.title}</p>
                <button>
                    <XCircleIcon className='ml-5 h-8 w-8 hover:text-red-500 text-red-500' />
                </button>
            </div>
        </div>
    )
}

export default TodoCard