// libs
import Bus from 'src/Infrastructure/Bus';

export default class Nadia {

// commands (async - return via optional callback when done)
    static command = {
        ruleDescriptionUpdate: (oldRuleName, ruleName, ruleCategory)=>{
            Bus.command('rule/updateRule', {oldRuleName:oldRuleName, newRuleName: ruleName, newRuleCategory: ruleCategory}).done((res)=>{
                if(res.newRuleName = ruleName && res.newCategory == ruleCategory)//success case of redirect
                {
                  Bus.publish('Toast', {
                    status: 'info',
                    text: 'The rule has been successfully created.'
                  });
                }
            })
        },

        createNewRule:(ruleName, ruleCategory)=>{
            Bus.command('rule/createNewRule',{name: ruleName, category: ruleCategory}).done((res)=>{
                if(res.ruleName = ruleName && res.category == ruleCategory)//success case of redirect
                {
                  Bus.publish('Toast', {
                    status: 'info',
                    text: 'The rule has been successfully created.'
                  });
                }
            })
        },

        saveRuleText:(ruleName, ruleText)=>{
            Bus.command('rule/createFile',{ruleName:ruleName, ruleText:ruleText}).done((res)=>{
                if(res.ruleText == ruleText)
                {
                    Bus.publish('Toast', {
                        status: 'info',
                        text: 'The rule text has been successfully updated.'
                      });          
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

        findRuleTextByName: (ruleName, callback)=>{
            Bus.query('rule/findRuleTextByName/',{ruleName:ruleName}).done((res)=>{
                callback(res);
            });
        },

        searchRuleByName: (ruleName, callback)=>{
            Bus.query('rule/searchRuleByName/',{ruleName:ruleName}).done((res)=>{
                callback(res);
            });
        }


        
    }
}