import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'

import TechList from '~/components/TechList'

//Descreve qual é o componente a ser testado
describe('TechList component', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  //Descreve o teste que será feito
  it('should be able to add new tech', () => {
    // getByText é o texto (child) do botão.
    // getByTestId são para elementos não tão fáceis
    // de rastrear, no nosso caso uma UL/LI
    const { getByText, getByTestId, getByLabelText /* debug */ } = render(
      <TechList />
    )

    //Debug é importante para vermos como está
    // ficando o HTML antes e depois das ações
    //debug()

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } })
    fireEvent.submit(getByTestId('tech-form'))

    // Dispara um evento de clique em um elemento
    // neste caso em um botão.
    //fireEvent.click(getByText('Adicionar'))

    //debug()

    // Neste teste esperamos (expect) encontrar pelo ID
    // 'tech-list' um elemento filho que contenha o testo 'Node.js'
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'))
    expect(getByLabelText('Tech')).toHaveValue('')
  })

  it('should store techs in storage', () => {
    let { getByTestId, getByLabelText, getByText } = render(<TechList />)

    fireEvent.change(getByLabelText('Tech'), { target: { value: 'Node.js' } })
    fireEvent.submit(getByTestId('tech-form'))

    cleanup()
    ;({ getByTestId, getByLabelText, getByText } = render(<TechList />))

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'techs',
      JSON.stringify(['Node.js'])
    )
    expect(getByTestId('tech-list')).toContainElement(getByText('Node.js'))
  })
})
