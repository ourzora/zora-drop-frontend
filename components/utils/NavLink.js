import React, { Children } from 'react'
import { useRouter } from 'next/router'
import cx from 'classnames'
import Link from 'next/link'

export const NavLink = ({
  children,
  activeClassName = 'active',
  ...props
}) => {
  const { asPath } = useRouter()
  const child = Children.only(children)
  const childClassName = child.props.className || ''

  const isActive = asPath === props.href || asPath === props.as
  const pathName = `${asPath}`.split('/')[1]
  const activePath = pathName === '' ? 'index' : pathName

  const className = cx(childClassName, activePath, {
    [activeClassName]: isActive,
  })

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  )
}
