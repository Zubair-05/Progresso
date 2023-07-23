import { format } from "path"
import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board) => {
    const todos = formatTodosForAI(board);

    console.log(board);
    console.log(todos);

    // const response = await fetch('/api/generateSummary', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ todos })
    // });

    // if (response.ok) {
    //   try {
    //     const GPTdata = await response.json();
    //     const { content } = GPTdata;
    //     return content;
    //   } catch (error) {
    //     console.error('Error parsing JSON response:', error);
    //     return null;
    //   }
    // } else {
    //   console.error('API request failed with status:', response.status);
    //   return null;
    // }
    const response = `Hey Mr Mahammad Zubair, you have ${(todos.todo) ? `${todos.todo}` : 'No'}  tasks to do, ${(todos.inprogress) ? `${todos.inprogress}` : 'No'} tasks in progress and ${(todos.done) ? `${todos.done}` : 'No'} tasks done. Have a productive day!`
    // return JSON.stringify({todos});
    return response;
};

export default fetchSuggestion;
