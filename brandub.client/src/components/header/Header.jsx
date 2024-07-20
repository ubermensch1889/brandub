import { useEffect, useState } from 'react'
import { styled } from 'styled-components'

const HeaderContainer = styled.header`
  height: 60px;
  display: flex;
  padding: 0 2rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  background: #fafafa;
`

export default function Header() {
  return (
      <HeaderContainer>
          <h1>Brundub</h1>
      </HeaderContainer>
  )
}
