import React, {Component, Fragment} from 'react'
import {StyleSheet, Text, View, Button} from 'react-native'
import Markdown from 'react-native-markdown-renderer'
import {styles, mdStyle} from './style.js'
import settings from './settings.json'
import tree from './tree.json'

function replaceVariables (node) {
  const str = settings.primarycontact || ''
  node.message = node.message.replace(/\$CONTACTPERSOON/g, str)
  if (node.options) {
    for (const i of node.options) replaceVariables(i)
  }
}
replaceVariables(tree)

export default class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      node: tree,
      history: [tree]
    }

    this.goToNode = this.goToNode.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  goToNode (newNode) {
    let {node, history} = this.state
    history = history.slice()
    history[history.indexOf(node) + 1] = newNode
    this.setState({node: newNode, history})
  }

  goBack () {
    const {node, history} = this.state
    const i = history.indexOf(node)
    if (i && i > 0) {
      this.goToNode(history[i - 1])
    }
  }

  render () {
    const {node, history} = this.state
    const buttons = []
    const backButton = history.indexOf(node) === 0 ? null :
      <Button
        style={styles.button}
        title="Terug"
        onPress={this.goBack}
      />

    if (node.options && node.options instanceof Array) {
      for (const i of node.options) {
        buttons.push(
          <Button
            style={styles.button}
            title={i.text}
            onPress={() => this.goToNode(i)}
            key={node.options.indexOf(i)}
          />
        )
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.messageArea}>
          <Markdown style={mdStyle}>
            {node.message || ''}
          </Markdown>
        </View>
        <View style={styles.buttonGroup}>
          {buttons}
        </View>
        <View style={styles.buttonGroup}>
          {backButton}
        </View>
      </View>
    )
  }
}
