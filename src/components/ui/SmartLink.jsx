import { Link } from 'react-router'

export default function SmartLink({ href, ...props }) {
  const isPage = href.startsWith('/') && !href.includes('#')
  return isPage ? <Link to={href} {...props} /> : <a href={href} {...props} />
}