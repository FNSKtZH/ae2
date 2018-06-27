//@flow
import React, { Fragment } from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import styled from 'styled-components'

const Comment = styled.span`
  font-size: 0.7em;
  position: relative;
  left: 200px;
`

const ComparatorList = () => {
  return (
    <Fragment>
      <MenuItem value="ILIKE">enthalten</MenuItem>
      <MenuItem value="LIKE">
        enthalten<Comment>Grosschreibung berücksichtigt</Comment>
      </MenuItem>
      <MenuItem value="="><span>&#61;</span><Comment>genau gleich</Comment></MenuItem>
      <MenuItem value=">"><span>&#62;</span><Comment>Zahlen wie Text sortiert</Comment></MenuItem>
      <MenuItem value=">="><span>&#62;&#61;</span><Comment>Zahlen wie Text sortiert</Comment></MenuItem>
      <MenuItem value="<"><span>&#60;</span><Comment>Zahlen wie Text sortiert</Comment></MenuItem>
      <MenuItem value="<="><span>&#60;&#61;</span><Comment>Zahlen wie Text sortiert</Comment></MenuItem>
    </Fragment>
  )
}

export default ComparatorList
