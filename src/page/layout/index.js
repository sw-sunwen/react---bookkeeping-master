import { TabBar } from 'antd-mobile'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { getbilllist } from '../../store/modules/bill-store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import _ from 'lodash'
import './index.scss'
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline
} from 'antd-mobile-icons' // 官方提供的图标库，专门为移动端React应用设计。


const tabs = [
  {
    key: '/month',
    icon: <BillOutline />,
    title: '月度账单'
  },
  {
    key: '/new',
    icon: <AddCircleOutline />,
    title: '记账'
  },
  {
    key: '/year',
    icon: <CalculatorOutline />,
    title: '年度账单'
  }
]
const Layout = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getbilllist())
  }, [dispatch])

  const navigate = useNavigate()
  const location = useLocation()
  
  const switchRoute = (path) => {
    console.log(path)
    navigate(path)
  }
  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>
      <div className='footer'>
        <TabBar activeKey={location.pathname} onChange={switchRoute}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}
export default Layout
