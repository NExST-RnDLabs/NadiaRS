// libs
import Bus from 'src/Infrastructure/Bus';

export default class Nadia {

// commands (async - return via optional callback when done)
    static command = {

    }

    // query (async - return via callback)
    static query = {
        getAllRules: (callback) =>{
            // Bus.query('rule/getAllRules').done((res) => {
            //     callback(res);
            // })
            var res = [
                {
                    category: 'Proposition',
                    name:'testing 1'
                },
                {
                    category: 'Calculation',
                    name: 'testing 2'
                },
                {
                    category: 'Proposition',
                    name: 'testing 3'
                },
                {
                    category: 'Proposition',
                    name: 'testing 4'
                },
                {
                    category: 'Proposition',
                    name: 'testing 5'
                },
                {
                    category: 'Proposition',
                    name: 'testing 6'
                }];
            callback(res);
        },

        getRuleByName: (ruleName, callback)=>{
            Bus.query('/findRuleByName/',ruleName).done((res)=>{
                callback(res);
            });
        }
    }
}