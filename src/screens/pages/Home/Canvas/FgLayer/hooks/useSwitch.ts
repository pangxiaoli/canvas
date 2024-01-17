import { getStation } from '@/store/draw/selectors';
import { shallowEqual, useSelector } from 'react-redux';
import { TTimePassed, TUseSwitch } from './type';

const useSwitch: TUseSwitch = () => {
    const switchs = useSelector(getStation, shallowEqual).switch;

    const timePassed: TTimePassed = (from, to) => {
        console.log(switchs, from, to);
        // TODO dp
        return Math.floor(Math.random() * 5);
    };

    return {
        timePassed,
    };
};

export default useSwitch;
