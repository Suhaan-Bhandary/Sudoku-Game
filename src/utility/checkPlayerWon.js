const checkPlayerWon = (board) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++){
            if(board[i][j].value === 0 || board[i][j].isValid === false){
                return false;
            }
        }
    }
    return true;
};

export default checkPlayerWon;