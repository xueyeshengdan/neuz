import styled from 'styled-components'

import BooleanSlider from './BooleanSlider'
import ConfigLabel from './ConfigLabel'
import ConfigPanel from './ConfigPanel'
import ConfigRow from './ConfigRow'

import SlotBar from '../SlotBar'
import { FarmingConfigModel, SlotBarModel, SlotModel, SlotType } from '../../models/BotConfig'

type Props = {
    className?: string,
    config: FarmingConfigModel,
    onChange?: (config: FarmingConfigModel) => void,
}

const createSlotBar = () => (
    [...new Array(10)].map(_ => ({ slot_type: 'Unused' } as SlotModel)) as SlotBarModel
)

const FarmingConfig = ({ className, config, onChange }: Props) => {
    const handleSlotChange = (type: SlotType, index: number) => {
        if (!onChange) return
        const newConfig = { ...config, slots: config.slots ?? createSlotBar() }
        newConfig.slots[index] = { slot_type: type }
        onChange(newConfig)
    }

    return (
        <>
            <SlotBar slots={config.slots ?? createSlotBar()} onChange={handleSlotChange} />
            <ConfigPanel>
                <ConfigRow>
                    <BooleanSlider value={config.on_demand_pet ?? false} onChange={value => onChange?.({ ...config, on_demand_pet: value })} />
                    <ConfigLabel name="On-Demand Pickup Pet" helpText="Manages pickup pet activation automatically. Make sure the pet is NOT summoned before starting." />
                </ConfigRow>
                <ConfigRow>
                    <BooleanSlider value={config.use_attack_skills ?? false} onChange={value => onChange?.({ ...config, use_attack_skills: value })} />
                    <ConfigLabel name="Use Skills to Attack" helpText="Enables the use of skills configured in the action slot to attack. DO NOT ACTIVATE unless you got a Refresher Hold or Vital Drink X active (depending on whether it's an MP or FP skill)." />
                </ConfigRow>
                <ConfigRow>
                    <BooleanSlider value={config.stay_in_area ?? false} onChange={value => onChange?.({ ...config, stay_in_area: value })} />
                    <ConfigLabel name="Stay in Area" helpText="The bot will try to wait in the area and not move around too much." />
                </ConfigRow>
            </ConfigPanel>
        </>
    )
}

export default styled(FarmingConfig)`
`