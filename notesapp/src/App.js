import './App.css';
import {useEffect, useReducer} from "react";
import {API} from "aws-amplify";
import {listNotes} from "./graphql/queries";
import {List} from "antd";

const initialState = {
    notes: [],
    loading: true,
    error: false,
    form: {name: '', description: ''}
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_NOTES":
            return {...state, notes: action.notes, loading: false}
        case 'ERROR':
            return {...state, loading: false, error: true}
        default:
            return state;
    }
};
const styles = {
    container: {padding: 20},
    input: {marginBottom: 10},
    item: {textAlign: 'left'},
    p: {color: '#1890FF'}
}

function App() {

    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchNotes = async () => {
        try {
            const notesData = await API.graphql({
                query: listNotes
            })
            dispatch({type: 'SET_NOTES', notes: notesData.data.listNotes.items})
        } catch (err) {
            console.log(err);
            dispatch({type: 'ERROR'});
        }
    }

    const renderItem = (item) => {
        return (
            <List.Item style={styles.item}>
                <List.Item.Meta
                    title={item.name}
                    description={item.description}
                />
            </List.Item>
        )
    }
    useEffect(() => {
        fetchNotes();
    }, [])

    return (
        <div style={styles.container}>
            <List
                loading={state.loading}
                dataSource={state.notes}
                renderItem={renderItem}
            />
        </div>
    );
}

export default App;