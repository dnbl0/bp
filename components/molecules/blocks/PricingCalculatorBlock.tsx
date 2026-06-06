import { CmsPricingCalculatorCard } from '../../../types/contentful-cms-types'
import PricingCalculatorCard from './PricingCalculatorCard'

export const PricingCalculatorBlock = ({ component }: { component: CmsPricingCalculatorCard }) => {
    console.log('PricingCalculatorBlock', component)
    const {id, header, customSubHeader, showMoreBtnText, showMoreText, backgroundColour, icon} = component;

    return (
        <PricingCalculatorCard 
        header={String(header)} 
        backgroundColour={String(backgroundColour)} 
        showMoreBtnText={String(showMoreBtnText)} 
        showMoreContent={String(showMoreText)} 
        subHeader={String(customSubHeader)}
        />
    )
}
