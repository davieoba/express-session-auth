/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { Tailwind } from '@react-email/components'
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  // Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

// const baseUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : 'http://localhost:5000/api/v1/auth/reset-password/123'

const ResetPassword = ({ userFirstname = 'David', resetPasswordLink = 'http://localhost:5000/api/v1/auth/reset-password:token' }) => {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Sage-Auth reset your password</Preview>
        <Body style={main}>
          <Container style={container}>
            <Text className='text-[20px] font-bold uppercase'>Sage-Auth</Text>
            <Section>
              <Text style={text}>Hi {userFirstname},</Text>
              <Text style={text}>
                Someone recently requested a password change for your Sage
                account. If this was you, you can set a new password here:
              </Text>
              <Button style={button} pX={20}
                pY={12} className='text-center flex items-center justify-center' href={resetPasswordLink}>
                Reset password
              </Button>

              <Container className='flex items-center gap-x-2'>
                <Text className=''>
                  or copy this
                </Text>

                <Link style={anchor} href={resetPasswordLink}>
                  {resetPasswordLink}
                </Link>

                <Text>
                  and paste in your browser url
                </Text>
              </Container>

              <Text style={text}>
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text style={text}>
                To keep your account secure, please don&apos;t forward this email
                to anyone. See our Help Center for{' '}
                <Link style={anchor} href="https://sage-website.vercel.app/portfolio">
                  more security tips.
                </Link>
              </Text>
              <Text style={text}>Happy Coding!</Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  padding: '45px',
}

const text = {
  fontSize: '16px',
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '300',
  color: '#404040',
  lineHeight: '26px',
}

const button = {
  backgroundColor: '#007ee6',
  borderRadius: '4px',
  color: '#fff',
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center',
}

const anchor = {
  textDecoration: 'underline',
}

export default ResetPassword