export const simpleLogicProcedure =
'CREATE procedure if not exists doglogic.dogIndexLogic(IN inputNumber int)\n' +
 'begin\n' +
 'declare indexNumber int;\n' +
 'if (inputNumber < 0 ) then set indexNumber = 0;\n' +
 'elseif (inputNumber > 100) then set indexNumber = 9;\n' +
 'end if;\n' +
 'select indexNumber;\n' +
 'end'
