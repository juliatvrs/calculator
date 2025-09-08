import { Box, IconButton, Flex, HStack, Button, Icon, Grid, GridItem, Text } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FiDelete } from "react-icons/fi";
import { CgMathDivide } from "react-icons/cg";
import { useState } from "react";
import { evaluate } from "mathjs";

function App() {

  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("#F7F8FB", "#17181A"); //primeiro valor é para o tema claro e o segundo valor para o tema escuro

  const bgDeleteButtons = useColorModeValue("#FFFFFF", "#616161");
  const colorDeleteButtons = useColorModeValue("#858585", "#A5A5A5");

  const bgOperationsButtons = useColorModeValue("#ADE2FF", "#005DB2");
  const colorOperationsButtons = useColorModeValue("#109DFF", "#339DFF");

  const bgNumbersButtons = useColorModeValue("#FFFFFF", "#303136");
  const colorNumbersButtons = useColorModeValue("#38B9FF", "#29A8FF");

  const [expression, setExpression] = useState("");
  
  const [result, setResult] = useState("");


  function handleClick(event) {
    if(divisionByZeroErrorMessage || expressionErrorMessage) {
      setDivisionByZeroErrorMessage("");
      setExpressionErrorMessage("");
      setExpression("");
    };

    if(result) {
      setExpression("");
      setResult("");
      setExpression(state => state + event.target.value);
    } else {
      if(event.target.value === ".") {
        //se a expressão estiver vazia ou terminar com um operador (+, -, *, /), é adicionado "0."
        if(expression === "" || /[+\-*/]$/.test(expression)) {
          setExpression(expression + "0.");
        } 
        //se o último número da expressão for um decimal, não será adicionado outro .
        else if(/\d*\.\d*$/.test(expression)) {
          return;
        } else {
          setExpression(expression + ".");
        };
      } else {
        setExpression(state => state + event.target.value);
      };
    };
  };


  const [expressionErrorMessage, setExpressionErrorMessage] = useState("");

  const [divisionByZeroErrorMessage, setDivisionByZeroErrorMessage] = useState("");
  

  function calculate() {
    try {
      if(expression.trim() === "") {
        setExpressionErrorMessage("Expressão inválida");
        return;
      };

      const expressionResult = evaluate(expression);

      if(!isFinite(expressionResult)) {
        setDivisionByZeroErrorMessage("Não é possível dividir por zero");
      } else {
        const formattedResult = expressionResult.toString().length > 12 ? Number(expressionResult).toExponential(5) : expressionResult;
        setResult(formattedResult);
      };
    } catch {
      setExpressionErrorMessage("Expressão inválida");
    };
  };


  function handleClearAllButtonClick() {
    if(divisionByZeroErrorMessage || expressionErrorMessage) {
      setDivisionByZeroErrorMessage("");
      setExpressionErrorMessage("");
    };

    setExpression("");
    setResult("");
  };


  function handleDeleteLastDigitButtonClick() {
    if(result) {
      setResult("");
    } else if(divisionByZeroErrorMessage) {
      setDivisionByZeroErrorMessage("");
    } else if(expressionErrorMessage) {
      setExpressionErrorMessage("");
    } else {
      setExpression(expression.slice(0, -1));
    };
  };

  
  return (
    <div>
      <Flex
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box
          width="375px"
          height="600px"
          borderRadius="39px"
          background={bgColor}
        >
          {colorMode === "dark" ? (
            <>
              <IconButton
                icon={<MoonIcon />}
                color="#0e60ad"
                fill={'none'}
                width="34px"
                margin="30px"
                borderRadius="6px"
                border="1px"
                borderColor="#0e60ad"
                background={bgColor}
                onClick={toggleColorMode}
              />
            </>
            ) : (
            <>
              <IconButton
                icon={<SunIcon />}
                color="#F6E05E"
                width="34px"
                margin="30px"
                borderRadius="6px"
                border="1px"
                borderColor="#F6E05E"
                background={bgColor}
                onClick={toggleColorMode}
              />
            </>
            )
          }

          <Box 
            marginRight={"34px"} 
            marginLeft={"34px"} 
            height="25px"
            overflow="hidden"
            whiteSpace="nowrap"
            display="flex"
            justifyContent="flex-end"
          >
            <Text align="right" fontSize="22px">
              {expression}
            </Text>
          </Box>

          {divisionByZeroErrorMessage ? (
            <Box 
              marginTop="6px" 
              marginRight={"18px"}
              marginLeft="18px"
              height="43px"
            >
              <Text align="right" fontSize="22px">
                {divisionByZeroErrorMessage}
              </Text>
            </Box>
          ) : expressionErrorMessage ? (
            <Box 
              marginTop="6px" 
              marginRight={"18px"}
              marginLeft="18px"
              height="43px"
            >
              <Text align="right" fontSize="22px">
                {expressionErrorMessage}
              </Text>
            </Box>
          ) : (
            <Box 
              marginTop="6px" 
              marginRight={"18px"}
              marginLeft="18px"
              height="43px"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              <Text align="right" fontSize="38px">
                = {result}
              </Text>
            </Box>
          )}

          <HStack
            marginTop="30px"
            marginLeft="34px"
            marginRight="34px"
            spacing="20px"
          >
            <Button
              size="default"
              background={bgDeleteButtons}
              fontSize="24px"
              color={colorDeleteButtons}
              onClick={handleClearAllButtonClick}
            >
              AC
            </Button>

            <Button
              size="default"
              background={bgDeleteButtons}
              fontSize="24px"
              color={colorDeleteButtons}
              onClick={handleDeleteLastDigitButtonClick}
            >
              <Icon as={ FiDelete } />
            </Button>

            <Button
              size="default"
              background={bgOperationsButtons}
              fontSize="27px"
              color={colorOperationsButtons}
              value="/"
              onClick={() => handleClick({ target: { value: "/" } })}
            >
              <Icon as={ CgMathDivide } />
            </Button>

            <Button
              size="default"
              background={bgOperationsButtons}
              fontSize="27px"
              color={colorOperationsButtons}
              value="*"
              onClick={handleClick}
            >
              x
            </Button>
          </HStack>

          <HStack
             marginLeft="34px"
             marginRight="34px"
             marginTop="10px"
             spacing="20px"
          >
            <Button
              size="default"
              background={bgNumbersButtons}
              fontSize="32px"
              color={colorNumbersButtons}
              value={7}
              onClick={handleClick}
            >
              7
            </Button>

            <Button
              size="default"
              background={bgNumbersButtons}
              fontSize="32px"
              color={colorNumbersButtons}
              value={8}
              onClick={handleClick}
            >
              8
            </Button>

            <Button
              size="default"
              background={bgNumbersButtons}
              fontSize="32px"
              color={colorNumbersButtons}
              value={9}
              onClick={handleClick}
            >
              9
            </Button>

            <Button
              size="default"
              background={bgOperationsButtons}
              fontSize="32px"
              color={colorOperationsButtons}
              value="-"
              onClick={handleClick}
            >
              -
            </Button>
          </HStack>

          <Grid
            marginLeft="34px"
            marginRight="34px"
            marginTop="10px"
            columnGap="20px"
            rowGap="10px"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(4, 1fr)"
          >
            <GridItem>
              <Button
                size="default"
                background={bgNumbersButtons}
                fontSize="32px"
                color={colorNumbersButtons}
                value={4}
                onClick={handleClick}
              >
                4
              </Button>
            </GridItem>

            <GridItem>
              <Button
                size="default"
                background={bgNumbersButtons}
                fontSize="32px"
                color={colorNumbersButtons}
                value={5}
                onClick={handleClick}
              >
                5
              </Button>
            </GridItem>

            <GridItem>
              <Button
                size="default"
                background={bgNumbersButtons}
                fontSize="32px"
                color={colorNumbersButtons}
                value={6}
                onClick={handleClick}
              >
                6
              </Button>
            </GridItem>

            <GridItem>
              <Button
                size="default"
                background={bgOperationsButtons}
                fontSize="32px"
                color={colorOperationsButtons}
                value="+"
                onClick={handleClick}
              >
                +
              </Button>
            </GridItem>

            <GridItem>
              <Button
                size="default"
                background={bgNumbersButtons}
                fontSize="32px"
                color={colorNumbersButtons}
                value={1}
                onClick={handleClick}
              >
                1
              </Button>
            </GridItem>

            <GridItem>
              <Button
                size="default"
                background={bgNumbersButtons}
                fontSize="32px"
                color={colorNumbersButtons}
                value={2}
                onClick={handleClick}
              >
                2
              </Button>
            </GridItem>

            <GridItem>
              <Button
                size="default"
                background={bgNumbersButtons}
                fontSize="32px"
                color={colorNumbersButtons}
                value={3}
                onClick={handleClick}
              >
                3
              </Button>
            </GridItem>

            <GridItem rowSpan={2}>
              <Button
                width="62px"
                height="100%"
                background={useColorModeValue === "dark" ? "#1991FF" : "#19ACFF"}
                fontSize="32px"
                color="#B2DAFF"
                value="="
                onClick={calculate}
              >
                =
              </Button>
            </GridItem>

            <GridItem colSpan={2} rowSpan={1}>
              <Button
                width="144px"
                height="60px"
                background={bgNumbersButtons}
                fontSize="32px"
                color={colorNumbersButtons}
                value={0}
                onClick={handleClick}
              >
                0
              </Button>
            </GridItem>

            <GridItem >
              <Button
                size="default"
                background={bgNumbersButtons}
                fontSize="32px"
                color={colorNumbersButtons}
                onClick={() => handleClick({ target: { value: "." } })}
              >
                .
              </Button>
            </GridItem>
          </Grid>

        </Box>
      </Flex>
    </div>
  );
};

export default App;