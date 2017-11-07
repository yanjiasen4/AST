export default {
  'minimumOps': [
    'AORB', 'AORS', 'AORU', 'ROR', 'UOI'
  ],
  'methodLevelOps': [
    'AORB', /* <TODO> AORB (Arithmetic Operator Replacement (Binary)) mutants --
               replace an arithmetic operator by each of the other operators (*, /, %, +, -) */
    'AORS', /* <TODO> AORS (Arithmetic Operator Replacement (Short-cut)) mutants --
               replace each occurrence of the increment and decrement operators by each of the other operators */
    'AORU', /* <TODO> AORU (Arithmetic Operator Replacement (Unary)) mutants --
               replace each occurrence of one of the arithmetic operators + and - by each of the other operators */
    'AOIU', /* AOIU (Arithmetic Operator Insertion (Unary)) mutants -- insert a
               unary operator (arithmetic -) before each variable or expression */
    'AOIS', /* AOIS (Arithmetic Operator Insertion (Short-cut)) mutants --
               insert unary operators (increment ++, decrement --) before and after each variable of an arithmetic type */
    'AODU', /* AODU (Arithmetic Operator Deletion (Unary)) mutants --
               delete a unary operator (arithmetic -) before each variable or expression */
    'AODS', /* AODS (Arithmetic Operator Deletion (Short-cut)) mutants --
               delete each occurrence of an increment operator (++) or a decrement operator (--) */
    'ROR', /* <TODO> ROR (relational Operator Replacement) mutants --
              replace each occurrence of one of the relational operators
              (<, <=, >, >=, =, <>) by each of the other operators */
    'ABS', /* <TODO> ABS (Absolute Value Insertion) mutants --
              modify each arthmetic expression (and subexpression) by the function abs(), negAbs(), and faileOnZero() */
    'UOI', /* <TODO> UOI (Unary operator insertion) mutants --
              inserts each unary operator (arithmetic +, arithmetic -, conditional !, logical ~) before each expression of the correct type */
    'COR',
    'COD',
    'COI',
    'SOR',
    'LOR',
    'LOI',
    'LOD',
    'ASRS',
    'SDL',
    'VDL',
    'CDL',
    'ODL'
  ],
  'classLevelOps': [

  ]
}
