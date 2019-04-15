import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { BallIndicator } from "react-native-indicators";
import { FETCH_SEASONS } from "../query/SeasonList";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  headerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#ff8080",
    width: "100%",
  },
  header: {
    fontFamily: "FjallaOne-Regular",
    padding: 10,
    fontSize: 40,
    color: Colors.white,
  },
  formView: {
    flex: 1,
    width: "80%",
  },
  formInput: {
    marginTop: 10,
  },
  formInputStyle: {
    borderColor: Colors.appBackground,
  },
  formInputTextStyle: {
    fontFamily: "MerriweatherSans-Regular",
  },
  formButton: {
    margin: 10,
    backgroundColor: Colors.appBackground,
    paddingHorizontal: 30,
    shadowColor: Colors.borderBlack,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  formButtonTitle: {
    fontFamily: "MerriweatherSans-Bold",
    paddingHorizontal: 10,
    fontSize: 18,
    color: Colors.white,
  },
});

const INSERT_SEASON = gql`
  mutation($name: String!, $description: String) {
    insert_season(objects: [{ name: $name, description: $description }]) {
      returning {
        id
        name
        description
      }
    }
  }
`;

class AddSeason extends React.Component {
  navigationOptions = {
    title: "Add Season",
  };

  state = {
    name: "",
    description: "",
  };

  handleNameChange = name => {
    this.setState({
      name,
    });
  };

  handleDescriptionChange = description => {
    this.setState({
      description,
    });
  };

  render() {
    const { navigation } = this.props;
    const { name, description } = this.state;
    return (
      <Mutation
        mutation={INSERT_SEASON}
        variables={{
          name,
          description,
        }}
        update={(cache, { data: { insert_season } }) => {
          const data = cache.readQuery({
            query: FETCH_SEASONS,
          });
          const newSeason = insert_season.returning[0];
          const newData = {
            season: [...data.season, newSeason],
          };
          cache.writeQuery({
            query: FETCH_SEASONS,
            data: newData,
          });
        }}
      >
        {(insertSeason, { loading, error }) => {
          const submit = async () => {
            await insertSeason();
            navigation.navigate("SeasonList");
          };

          if (error) {
            // TODO: add error handling
            console.log(error);
          }

          return (
            <View style={styles.container}>
              <View style={styles.headerView}>
                <Text style={styles.header}>Add Season</Text>
              </View>
              <View style={styles.formView}>
                <Input
                  containerStyle={styles.formInput}
                  inputContainerStyle={styles.formInputStyle}
                  inputStyle={styles.formInputTextStyle}
                  placeholder="Name"
                  onChangeText={this.handleNameChange}
                />
                <Input
                  containerStyle={styles.formInput}
                  inputContainerStyle={styles.formInputStyle}
                  inputStyle={styles.formInputTextStyle}
                  placeholder="Description"
                  onChangeText={this.handleDescriptionChange}
                />
                {loading ? (
                  <Button
                    onPress={submit}
                    buttonStyle={styles.formButton}
                    titleStyle={styles.formButtonTitle}
                    icon={<BallIndicator color={Colors.white} size={20} />}
                  />
                ) : (
                  <Button
                    onPress={submit}
                    buttonStyle={styles.formButton}
                    titleStyle={styles.formButtonTitle}
                    icon={
                      <Icon
                        name="plus"
                        type="font-awesome"
                        size={20}
                        color={Colors.white}
                      />
                    }
                    title="Add"
                  />
                )}
              </View>
            </View>
          );
        }}
      </Mutation>
    );
  }
}

export default AddSeason;
