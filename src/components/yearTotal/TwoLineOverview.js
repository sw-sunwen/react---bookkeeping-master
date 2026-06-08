const TwoLineOverview = ({ pay, income }) => {
    
    return (
        <div>
            <div className="kaTwoLineOverview flex items-center justify-between mx-8 my-4">
                <div className="kaTwoLineOverview-l">
                    <div className="kaTwoLineOverview-left-title">支出</div>
                    <div className="kaTwoLineOverview-left-content">{pay}</div>
                </div>
                <div className="kaTwoLineOverview-m">
                    <div className="kaTwoLineOverview-right-title">收入</div>
                    <div className="kaTwoLineOverview-right-content">{income}</div>
                </div>
                <div className="kaTwoLineOverview-r">
                    <div className="kaTwoLineOverview-right-title">结余</div>
                    <div className="kaTwoLineOverview-right-content">{income + pay}</div>
                </div>
                
            </div>
        </div>
  )
}
export default TwoLineOverview