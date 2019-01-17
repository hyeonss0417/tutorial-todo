import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput
} from "react-native";

const { width, height } = Dimensions.get("window");

class ToDo extends Component {
  state = {
    isEditing: false,
    isCompleted: false,
    editingValue: ""
  };
  render() {
    const { isCompleted, isEditing, editingValue } = this.state;
    const { text } = this.props;
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
                  styles.input,
                  styles.text,
                  isCompleted ? styles.completedText : styles.uncompletedText
                ]}
                multiline={true}
              />
            : <Text
                style={[
                  styles.text,
                  isCompleted ? styles.completedText : styles.uncompletedText
                ]}
              >
                {" "}{text}
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
              <TouchableOpacity>
                <View style={styles.actionContainer}>
                  <Text style={styles.actionText}>🗑</Text>
                </View>
              </TouchableOpacity>
            </View>}
      </View>
    );
  }

  _toggleCompleteToDo = () => {
    this.setState(prevState => {
      return {
        isCompleted: !prevState.isCompleted
      };
    });
  };

  _startEditing = () => {
    const { text } = this.props;
    this.setState({
      isEditing: true,
      editingValue: text
    });
  };

  _finishEditing = flag => {
    this.setState({
      isEditing: false
    });
    if (flag == true) {
      console.log("asd");
    }
  };
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
    marginVertical: 20
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
    width: width / 2,
    justifyContent: "space-between"
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
