//@flow
import React from 'react'
import TextField from '@material-ui/core/TextField'
import styled from 'styled-components'
import compose from 'recompose/compose'
import { withApollo } from 'react-apollo'
import debounce from 'lodash/debounce'

import exportIdsMutation from '../../exportIdsMutation'

const IdField = styled(TextField)`
  margin-top: 2px !important;
`

const enhance = compose(withApollo)

type Props = {
  value: string,
  propData: Object,
}

type State = {
  value: string,
}

class IdFilterField extends React.Component<Props, State> {
  state = {
    value: '',
  }

  change = debounce(value => {
    const { client } = this.props
    client.mutate({
      mutation: exportIdsMutation,
      variables: {
        value,
      },
    })
  }, 200)

  handleChange = event => {
    const { value } = event.target
    this.setState({ value })
    // convert values into an array of values, separated by commas
    const valueForStore = value ? JSON.parse(`"[${event.target.value}]"`) : []
    this.change(valueForStore)
  }

  render() {
    return (
      <IdField
        id="id"
        label="id"
        multiline
        rowsMax="5"
        value={this.state.value}
        onChange={this.handleChange}
        margin="normal"
        fullWidth
        helperText="Sie können mehrere id's kommagetrennt einfügen"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    )
  }
}

export default enhance(IdFilterField)
