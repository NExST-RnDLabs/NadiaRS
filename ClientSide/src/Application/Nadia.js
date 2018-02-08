// libs
import Bus from 'src/Infrastructure/Bus';

export default class Nadia {

// commands (async - return via optional callback when done)
    static command = {
        ruleDescriptionChange:(ruleName, ruleCategory)=>{
            debugger;
            Bus.command('rule/createRule',{ruleName: ruleName, category: ruleCategory}).done((res)=>{
                console.log('res: ',res)
                if(res.ruleName = ruleName && res.category == ruleCategory)//success case of redirect
                {
                  Bus.publish('Toast', {
                    status: 'info',
                    text: 'The rule has been successfully created.'
                  });
      
                  Bus.publish('Refresh');
                }
            })
        },
    }

    // query (async - return via callback)
    static query = {
        getAllRules: (callback) =>{
            Bus.query('rule/findAllRules').done((res) => {
                callback(res);
            });            
        },

        getRuleByName: (ruleName, callback)=>{
            Bus.query('rule/findRuleByName/',ruleName).done((res)=>{
                callback(res);
            });
        },


        
    }
}