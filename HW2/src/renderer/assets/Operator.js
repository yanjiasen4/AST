export default {
  /* <TODO> AORB (Arithmetic Operator Replacement (Binary)) mutants --
     replace an arithmetic operator by each of the other operators (*, /, %, +, -) */
  'AORB': 0,
  /* <TODO> AORS (Arithmetic Operator Replacement (Short-cut)) mutants --
      replace each occurrence of the increment and decrement operators by each of the other operators */
  'AORS': 1,
  /* <TODO> AORU (Arithmetic Operator Replacement (Unary)) mutants --
      replace each occurrence of one of the arithmetic operators + and - by each of the other operators */
  'AORU': 2,
  /* <TODO> ROR (relational Operator Replacement) mutants --
    replace each occurrence of one of the relational operators
    (<, <=, >, >=, =, <>) by each of the other operators */
  'ROR': 3,
  /* <TODO> UOI (Unary operator insertion) mutants --
  inserts each unary operator (arithmetic +, arithmetic -, conditional !, logical ~) before each expression of the correct type */
  'UOI': 4,
  /* <TODO> LCR (Logical connector replacement) mutants --
     replace each occurrence of one of the logical operators
     (&&, ||) by each of the other operators */
  'LCR': 5,
  /* <TODO> ABS (Absolute Value Insertion) mutants --
     modify each arthmetic expression (and subexpression) by the function abs(), negAbs(), and faileOnZero() */
  'minimumOps': ['AORB', 'AORS', 'AORU', 'ROR', 'LCR'],
  'AORB_Op': ['+', '-', '*', '/', '%'],
  'AORS_Op': ['+=', '-=', '*=', '/=', '%='],
  'AORU_Op': ['++', '--'],
  'ROR_Op': ['<', '>', '==', '!=', '<=', '>='],
  'LCR_Op': ['&&', '||'],
  'OpIndex': ['AORB_Op', 'AORS_Op', 'AORU_Op', 'ROR_Op', 'UOI', 'LCR_Op']
}
