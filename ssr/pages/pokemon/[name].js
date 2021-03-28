// import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
// import { useQuery } from 'react-query'
import { Container, Row, Col } from 'react-bootstrap'
import { Fragment } from 'react'


const getPokemon = async (name) => {
  const { data } = await axios.get(`htttp://localhost:3000/api/pokemon?name=${escape(name)}`)
  return data
}

export async function getServerSideProps(context) {
  const data = await getPokemon(context.params.name)
  return {
    props: {
      data: data,
    }, // will be passed to the page component as props
  }
}

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