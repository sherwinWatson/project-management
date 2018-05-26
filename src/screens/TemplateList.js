import React from 'react'
import { connect } from 'react-redux'
import theme from '../styles/theme'
import color from '../styles/color'
import { View, StyleProvider, Container, Content, Button, Icon, List, ListItem, Left, Thumbnail, Body, Text, Spinner } from 'native-base'
import {getTemplateList} from '../redux/storyboard/actions'
import font from '../styles/font'
import margin from '../styles/margin'
import LoadingView from './../components/LoadingView'

class TemplateList extends React.Component {
  componentWillMount() {
    const {dispatchGetTemplateList} = this.props
    dispatchGetTemplateList()
  }

  render() {
    const { templates, navigation, refreshing } = this.props

    const styles = {
      container: {
        margin: margin.s12,
        borderBottomColor: color.darkText,
      },
      addNewButton: {
        flex: 1,
        margin: margin.s16,
        justifyContent: 'center',
      },
      text: {
        fontSize: 21,
        marginBottom: margin.s8,
        alignSelf: 'flex-start',
        ...font.bold,
      },
      content: {
        flexDirection: 'row',
        flexShrink: 1,
        justifyContent: 'space-between',
        marginLeft: 10,
      },
      contentBody: {
        flexShrink: 1,
        justifyContent: 'space-between',
      },
    }

    const renderListItem = (data) => {
      return (
        <ListItem style={{ ...styles.container }} onPress={() => navigation.navigate('Contacts')} avatar>
          <View style={{...styles.content}}>
            <Body style = {{...styles.contentBody}}>
              <Text style={{ ...styles.text }}>{data.name}</Text>
            </Body>
          </View>
        </ListItem>
      )
    }

    const renderContent = () => {
      return (
        <List
          contentContainerStyle={{ flexGrow: 1 }}
          removeClippedSubviews={false}
          dataArray={[{name: 'Default'}]}
          renderRow={renderListItem}
          // renderFooter={renderFooterLoading}
        />
      )
    }

    return (
      <StyleProvider style={theme}>
        <Container>
          <LoadingView isShown={refreshing} isModal={false} />
          {renderContent()}
        </Container>
      </StyleProvider>
    )
  }
}

const mapStateToProps = (state) => ({
  templates: state.storyboard.templateList.result.data,
  refreshing: state.storyboard.templateList.refreshing,
  error: state.storyboard.templateList.error,
})

const mapDispatchToProps = (dispatch, props) => ({
  dispatchGetTemplateList() {
    dispatch(getTemplateList())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemplateList)
