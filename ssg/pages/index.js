import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/Link'
import styles from '../styles/Home.module.css'
import { Container, FormControl, Row, Col, Card } from 'react-bootstrap'
import axios from 'axios'
import { useQuery } from 'react-query'

const getPokemon = async (q) => {
  const { data } = await axios.get(`/api/search?q=${escape(q['queryKey'][0])}`)
  // return data
  return data.map((pokemon) => ({
    ...pokemon,
    image: `/pokemon/${pokemon.name.english.toLowerCase().replace(' ', '-')}.jpg`
  }))
}

export default function Home() {

  const [query, setQuery] = useState('')
  const { data } = useQuery(query, getPokemon)

  // console.log(data)

  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <FormControl
          placeholder='Search'
          aria-label='Search'
          value={query}
          onChange={ (evt) => setQuery(evt.target.value) }
        />
        {
          data && (
            <Row>
              {
                data.map(({ id, name, type, image }) => (
                  <Col xs={4} key={id} style={{ padding: 5 }}>
                    <Link href={`/pokemon/${name.english}`}>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={image}
                          style={{maxHeight: 300}}
                        >

                        </Card.Img>
                        <Card.Body>
                          <Card.Title>{ name.english }</Card.Title>
                          <Card.Subtitle>{ type.join(', ') }</Card.Subtitle>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))
              }
            </Row>
          )
        }
      </Container>
    </div>
  )
}
