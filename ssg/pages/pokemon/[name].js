import Head from 'next/head'
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import { Fragment } from 'react'
import pokemon from '../../pokemon.json'


export default ({ data }) => {
  // const router = useRouter()
  // const { data } = useQuery(router.query.name, getPokemon)
  return (
    <div>
      <Head>
        <title>{(data && data.name.english) || "Pokemon"}</title>
      </Head>
      <Container>
        {
          data && (
            <Fragment>
              <h1>{ data.name.english }</h1>
              <Row>
                <Col xs={4}>
                  <img
                    src={`/pokemon/${data.name.english.toLowerCase().replace(' ', '-')}.jpg`}
                    style={{width: "100%"}}
                  />
                </Col>
                <Col xs={8}>
                  {
                    Object.entries(data.base).map(([key, value]) => (
                      <Row key={key}>
                        <Col xs={2}>{key}</Col>
                        <Col xs={10}>{value}</Col>
                      </Row>
                    ))
                  }
                </Col>
              </Row>
            </Fragment>
          )
        }
      </Container>
    </div>
  )
}

export async function getStaticPaths() {

  const paths = pokemon.map(({ name: { english } }) => ({
    params: {
      name: english
    }
  }))

  return {
    paths: paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const data = pokemon.filter(({ name: { english } }) => english === context.params.name)[0]
  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  }
}