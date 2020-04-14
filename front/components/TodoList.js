import React, {useState} from "react";
import {Button, Divider, ListItemSecondaryAction, Paper, TextField} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import ListSubheader from '@material-ui/core/ListSubheader';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import ClearIcon from '@material-ui/icons/Clear';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {useDispatch, useSelector} from "react-redux";
import {ADD_TODO_REQUEST, REMOVE_TODO_REQUEST} from "../reducers/user";

const TodoList = () => {
    const dispatch = useDispatch();
    const {todoList} = useSelector(state => state.user);
    const [checked, setChecked] = useState([]);
    const [left, setLeft] = useState([0, 1, 2, 3]);
    const [content, setContent] = useState(['일번', '이번', '삼번', '사번']);
    const [onAdd, setOnAdd] = useState(false);
    const [todoContent, setTodoContent] = useState('');

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = left.splice(currentIndex, 1);
        setChecked(newChecked);
    };

    const onClickTodoAdd = () => {
        setOnAdd(true);
    }
    const onClickTodoAddCancel = () => {
        setTodoContent('');
        setOnAdd(false);
    }
    const onChangeTodoContent = (e) => {
        setTodoContent(e.target.value);
    }
    const onClickTodoPost = () => {
        dispatch({
            type: ADD_TODO_REQUEST,
            data: {
                todoContent
            },
        });
        setTodoContent('');
        setOnAdd(false);
    }
    const onClickTodoRemove = (todoId) => () => {
        console.log(todoId);
        dispatch({
            type: REMOVE_TODO_REQUEST,
            data:todoId,
        });
    }
    return (
        <> 
            <Paper style={{
                display: 'inline - block',
                position: 'sticky',
                top: '12%',
                left:'1%',
                width: '90%',
                height: '800px',
            }}>
                <List dense component="div" role="list">
                    <ListSubheader component="div" id="nested-list-subheader" style={{textAlign:'center', fontSize:25,}}>
                        To - Do List
                        { !onAdd
                            ?
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="remove">
                                    <AddIcon onClick={onClickTodoAdd}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                            :
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="remove">
                                    <ClearIcon onClick={onClickTodoAddCancel}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        }
                    </ListSubheader>

                    <Divider />
                    { onAdd &&
                        <ListItem role={undefined} dense text>
                            <TextField
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                style={{width:'80%', marginLeft:'3%'}}
                                value={todoContent}
                                onChange={onChangeTodoContent}
                                autoFocus={true}
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="remove">
                                    <AddCircleOutlineIcon onClick={onClickTodoPost}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    }

                    {todoList.map((todo, index) => {
                        return (
                            <ListItem key={todo.todoContent} role={undefined} dense button onClick={handleToggle(index)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText  primary={todo.todoContent} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="remove">
                                        <RemoveCircleOutlineIcon onClick={onClickTodoRemove(todo.id)}/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                    <ListItem />
                </List>
            </Paper>
        </>
    );
};

export default TodoList;