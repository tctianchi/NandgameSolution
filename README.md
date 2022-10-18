# Nandgame Solution

My solution of [nandgame.com](https://nandgame.com/).

## Table of contents

* [H.2.4 Increment (75 nands)](#h24-increment-75-nands)
* [H.2.5 Subtraction (139 nands)](#h25-subtraction-139-nands)
* [H.4.1 Logic Unit (183 nands)](#h41-logic-unit-183-nands)
* [H.4.2 Arithmetic Unit (232 nands)](#h42-arithmetic-unit-232-nands)
* [H.4.3 ALU (594 nands)](#h43-alu-594-nands)
* [H.4.4 Condition (50 nands)](#h44-condition-50-nands)
* [H.5.1 Latch (4 nands) Without "select1" Bug](#h51-latch-4-nands-without-select1-bug)
* [H.6.2 Instruction (693 nands)](#h62-instruction-693-nands)
* [H.6.3 Control Unit (780 nands)](#h63-control-unit-780-nands)
* [O.3.1 Max (106 nands)](#o31-max-106-nands)
* [O.2.5 Barrel Shift Left (95 nands)](#o25-barrel-shift-left-95-nands)
* [O.3.2 Multiplication (1404 nands)](#o32-multiplication-1404-nands)
* [O.4.1 Unary ALU (68 nands)](#o41-unary-alu-68-nands)
* [O.5.2 Floating-point multiplication (178 nands)](#o52-floating-point-multiplication-178-nands)
* [O.5.3 Normalize overflow (58 nands)](#o53-normalize-overflow-58-nands)
* [O.5.5 Align significands (415 nands)](#o55-align-significands-415-nands)
* [O.5.6 Add signed magnitude (433 nands)](#o56-add-signed-magnitude-433-nands)

```
******************************************************
*                                                    *
*                                                    *
*                                                    *
*                     Spoiler                        *
*                                                    *
*                     Warning                        *
*                                                    *
*                                                    *
*                                                    *
*                                                    *
*                                                    *
*                                                    *
*                     Spoiler                        *
*                                                    *
*                     Warning                        *
*                                                    *
*                                                    *
*                                                    *
*                                                    *
*                                                    *
*                                                    *
*                     Spoiler                        *
*                                                    *
*                     Warning                        *
*                                                    *
*                                                    *
*                                                    *
*                                                    *
*                                                    *
*                                                    *
*                     Spoiler                        *
*                                                    *
*                     Warning                        *
*                                                    *
*                                                    *
*                                                    *
*                                                    *
*                                                    *
*                                                    *
*                     Spoiler                        *
*                                                    *
*                     Warning                        *
*                                                    *
*                                                    *
*                                                    *
****************************************************** 
```

## H.2.4 Increment (75 nands)

Half-add is enough.

![H.2.4 Increment](img/H.2.4-Increment.png)

## H.2.5 Subtraction (139 nands)

We will re-use this in Optional Levels later.

![H.2.5 Subtraction](img/H.2.5-Subtraction.png)

## H.4.1 Logic Unit (183 nands)

LUT (Lookup Table) is a commenly used trick in FPGAs.

![H.4.1 LogicUnit](img/H.4.1-LogicUnit.png)

## H.4.2 Arithmetic Unit (232 nands)

Implement add and sub in a single block. Select carry/borrow according to the add/sub bit.

![H.4.2 ArithmeticUnit](img/H.4.2-AddSub.png)

## H.4.3 ALU (594 nands)

* select16: 3 * 16 = 48 nands
* and16: 2 * 16 = 32 nands
* swap XY: select16 * 2 + 1 = 97 nands
* zero: and16 + 1 = 33 nands
* arithmetic or logic: select16 + 1 = 49 nands
* arithmetic: 232 nands
* logic: 183 nands
* final: 97 + 33 + 49 + 232 + 183 = 594 nands

![H.4.3 ALU](img/H.4.3-ALU.png)

## H.4.4 Condition (50 nands)

Splitting into data[15] and data[14:0] simplifies the logic.

![H.4.4 Condition](img/H.4.4-Condition.png)

## H.5.1 Latch (4 nands) Without "select1" Bug

A traditional [D latch](https://en.wikipedia.org/wiki/Flip-flop_(electronics)#Gated_D_latch).

Note: If you use "select1" in this level, unfortunately this is not correct in reality and can only exist in the game. If we expand the "select1" in this solution, we will find that the output is connected to an [SR nand latch](https://en.wikipedia.org/wiki/Flip-flop_(electronics)#SR_NAND_latch), in which it is illegal when S' = 0, R' = 0 at the same time.

![H.5.1 Latch](img/H.5.1-Latch.png)

## H.6.2 Instruction (693 nands)

* select16: 3 * 16 = 48 nands
* alu: 594 nands
* condition: 50 nands
* final: 1 + 48 + 594 + 50 = 693 nands

![H.6.2 Instruction](img/H.6.2-Instruction.png)

## H.6.3 Control Unit (780 nands)

* select16: 3 * 16 = 48 nands
* x/1: 2 * 15 + 2 = 32 nands
* alu instruction: 693 nands
* other selectors: 1 + 48 + 2 * 3 = 55 nands
* final: 55 + 32 + 693 = 780 nands

![H.6.3 Control Unit](img/H.6.3-ControlUnit.png)

## O.2.5 Barrel Shift Left (95 nands)

We exactly know which bits will become 0 and we can use "and" instead of "select".

![O.2.5 Barrel Shift Left](img/O.2.5-BarrelShiftLeft.png)

## O.3.1 Max (106 nands)

Let high.lte and high.gte denote that a <= b and a >= b in the higher bits.
* Select a if gte && !lte;
* Select b if !gte && lte;
* Compare a and b if lte && gte.

![O.3.1 Max](img/O.3.1-Max.png)

## O.3.2 Multiplication (1404 nands)

This work implements a 16bits x 16bits = 16bits Vedic Multiplier. (I think someone else's answers were 8bits x 8bits = 16bits.)

Since the overflow bit should be discarded according to the question, two types of components are designed. "mul4\*4=4" omits the 4 overflow bits (and you may find this type of components are quite easy to understand). "mul4\*4=8" keeps the 4 carry bits.

* mul2\*2=2: 8 nands
* mul2\*2=4: 13 nands
* mul4\*4=4: "mul2\*2=4" * 1 + "mul2\*2=2" * 2 + fullAddWithoutCarry * 2 + halfAdd * 2 = 55 nands
* mul4\*4=8: "mul2\*2=4" * 4 + fullAdd * 6 + halfAdd * 3 + 7 = 128 nands
* mul8\*8=8: "mul4\*4=8" * 1 + "mul4\*4=4" * 2 + fullAddWithoutCarry * 2 + fullAdd * 4 + halfAdd * 2 = 300 nands
* mul8\*8=16: "mul4\*4=8" * 4 + add4 * 2 + fullAdd * 6 + halfAdd * 5 + 7 = 670 nands
* mul16\*16=16: "mul8\*8=16" * 1 + "mul8\*8=8" * 2 + fullAddWithoutCarry * 2 + add4 * 2 + fullAdd * 4 + halfAdd * 2 = 1404 nands

![O.3.2 Multiplication](img/O.3.2-Multiplication.png)

> Reference:
> 
> Bathija, Rajesh et al. “Low Power High Speed 16x16 bit Multiplier using Vedic Mathematics.” International Journal of Computer Applications 59 (2012): 41-44.

## O.4.1 Unary ALU (68 nands)

Pre-calculate the common parts.

![O.4.1 UnaryALU](img/O.4.1-UnaryALU.png)

## O.5.2 Floating-point multiplication (178 nands)

The max possible exp is 0x1e + 0x1e - 15 = 45. So the output is 6-bits. (X + Y - 15) = (X + Y + 0b110001), so the 2nd layer requires even less adders.

The final nands showed by the game make no sense because the 11 x 11 = 22bits multiplcation is complicated. Anyway...

![O.5.2 Floating-point multiplication](img/O.5.2-FloatingPointMultiplication.png)

## O.5.3 Normalize overflow (58 nands)

The exponents only have 5 bits.

* select1 * 11: 33 nands
* halfAdd1 * 4: 20 nands
* final: 33 + 20 + 4 + 1 = 58 nands

![O.5.3 Normalize overflow](img/O.5.3-NormalizeOverflow.png)

## O.5.5 Align significands (415 nands)

The largest difference in the exponent bit is 0x1e - 0x1 = 0x1d, so we need a 5-bits shift-right. (The game author gives us a 4 bits version, we can build a 5-bit version on top of it. In this answer I build a better one.)

In order to handle 0x1 - 0x1e = -0x1d, we need a 6-bits subtraction. When the subtraction result is negative, I use a special 5-bits shift-right that accept negated value.

* barrel.shr11.bit0: 1 + 2 * 1 + 3 * 10 = 33
* barrel.shr11.bit1: 1 + 2 * 2 + 3 * 9 = 32
* barrel.shr11.bit2: 1 + 2 * 4 + 3 * 7 = 30
* barrel.shr11.bit3: 1 + 2 * 8 + 3 * 3 = 26
* barrel.shr11.bit4: 1 + 2 * 11 = 23
* barrel5.shr11: 33 + 32 + 30 + 26 + 23 = 144
* barrel.shr11.bit0.neg: 1 + 2 * 1 + 3 * 9 = 30
* barrel.shr11.bit1.neg: 1 + 2 * 2 + 3 * 9 = 32
* barrel.shr11.bit2.neg: 1 + 2 * 4 + 3 * 7 = 30
* barrel.shr11.bit3.neg: 1 + 2 * 8 + 3 * 3 = 26
* barrel.shr11.bit4.neg: 2 * 11 = 22
* barrel5.shr11.neg: 30 + 32 + 30 + 26 + 22 = 140
* sub1Half: 4
* sub1: 9
* sub1WithoutCarry: 8
* sub4: 36
* sub6: 8 + 36 + 1 + 4 = 49
* select1: 3
* select4: 3 * 4 = 12
* select5: 3 * 5 = 15
* select11: 3 * 11 = 33
* final: 15 + 33 * 2 + 1 + 140 + 144 + 49 = 415

![O.5.5 Align significands](img/O.5.5-AlignSignificands.png)

## O.5.6 Add signed magnitude (433 nands)

We do not need a "sub16" because:
* a - b = ~(~a + b)
* -a + b = ~(a + ~b)

Similar to my "O.3.1 Max", I build a "unsignedGte16" to detect if a >= b.

The selectors are also optimised in "o56AddSignedTruthTable", in which "s" means the final sign; "a/!a" means invert a if this bit = 0; "!ab/ab" means invert a+b if this bit = 1.

Conclusion: 433 nands
* add: 139 nands
* select A or ~A: 4 * 16 + 1 = 65 nands
* select B or ~B: 4 * 16 + 1 = 65 nands
* final invert: 4 * 16 = 64 nands
* selectors: 9 nands
* unsignedGte16: 91 nands

![O.5.6-AddSignedMagnitude](img/O.5.6-AddSignedMagnitude.png)
