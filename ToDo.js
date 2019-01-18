import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  AsyncStorage,
} from "react-native";
import PropTypes from "prop-types";

const { width, height } = Dimensions.get("window");

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editingValue: props.text
    };
  }
  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    deleteToDo: PropTypes.func.isRequired,
    toggleCompleteToDo: PropTypes.func.isRequired,
    updateToDo: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
  };
  render() {
    const { isEditing, editingValue } = this.state;
    const { text, id, deleteToDo, isCompleted } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.column}>
          <TouchableOpacity onPress={this._toggleCompleteToDo}>
            <View
              style={[
                styles.circle,
                isCompleted ? styles.completedCircle : styles.uncompletedCircle
              ]}
            />
          </TouchableOpacity>
          {isEditing
            ? <TextInput
                value={editingValue}
                style={[
                  styles.text,
                  styles.input,
                  isCompleted ? styles.completedText : styles.uncompletedText
                ]}
                autoCorrect={false}
                onChangeText={editingValue => this.setState({ editingValue })}
                multiline={true}
                returnKeyType={"done"}
                //onBlur={() => this._finishEditing(false)}
              />
            : <Text
                style={[
                  styles.text,
                  isCompleted ? styles.completedText : styles.uncompletedText
                ]}
              >
                {text}
              </Text>}
        </View>
        {isEditing
          ? <View style={styles.actions}>
              <TouchableOpacity onPressOut={() => this._finishEditing(true)}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>✅</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPressOut={() => this._finishEditing(false)}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>❌</Text>
                </View>
              </TouchableOpacity>
            </View>
          : <View style={styles.actions}>
              <TouchableOpacity onPressOut={this._startEditing}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>✏️</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPressOut={() => deleteToDo(id)}>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>🗑</Text>
                </View>
              </TouchableOpacity>
            </View>}
      </View>
    );
  }

  _toggleCompleteToDo = () => {
    const { toggleCompleteToDo, id, isCompleted } = this.props;
    toggleCompleteToDo(id);
  };

  _startEditing = () => {
    const { text } = this.props;
    this.setState({
      isEditing: true,
      editingValue: text
    });
  };

  _finishEditing = (flag) => {
    const { editingValue } = this.state;
    const { id, updateToDo } = this.props;
    if (flag == true) {
      updateToDo(id, editingValue);
    }
    this.setState({
      isEditing: false
    });
  };

  _saveToDos = (newToDos) => {
    console.log(newToDos);
    const saveToDos = AsyncStorage.setItem("toDos", newToDos);
  }

}

const styles = StyleSheet.create({
  container: {
    width: width - 50,
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    marginRight: 20
  },
  completedCircle: {
    borderColor: "#bbb"
  },
  uncompletedCircle: {
    borderColor: "#F23657"
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
    backgroundColor: "white",
    marginVertical: 15,
    width: width / 1.5,
    paddingTop: 5
  },
  completedText: {
    color: "#bbb",
    textDecorationLine: "line-through"
  },
  uncompletedText: {
    color: "#353535"
  },
  column: {
    flexDirection: "row",
    alignItems: "center",
    width: width / 2
  },
  actions: {
    flexDirection: "row"
  },
  actionContainer: {
    marginVertical: 10,
    marginHorizontal: 10
  },
  input: {}
});

export default ToDo;
