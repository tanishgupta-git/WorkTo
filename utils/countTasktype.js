export default function countTaskType(tasks,tasktype) {
    const count = tasks.reduce( (x,y) => {
        if ( y.tasktype === tasktype ) {
          return x + 1
        }
        return x;
         },0);

     return count;
}