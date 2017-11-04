import java.awt.event.*; 
import java.awt.*;//帮助文档的对话框类
class MyDialog extends Dialog implements ActionListener  //建立对话框类
{  static final int YES=1,NO=0;
   int message=-1; Button yes,no;
   TextArea area;String help;
   MyDialog(Frame f,String s,boolean b) //构造方法
   {  super(f,s,b);
      yes=new Button("确定"); yes.addActionListener(this);
      no=new Button("取消");   no.addActionListener(this);
      setLayout(new FlowLayout());
	 
	  help = "使用帮助：\n";
	  help +="本计算器运算方式采用输入整个运算式后进行运算的方式.\n";
	  help +="但由于作者能力有限，对有些运算符进行了重定义，现列出以下运算符：\n";
	  help +="s代表sin，c代表cos，t代表tan，！代表阶乘，l代表log\n";
	  help +="`代表负号，如果要用键盘输入的时候，请正确输入\n";
	  help +="本计算器有4大主要功能：         \n";
	  help +="1.进行符合运算，可以用键盘进行输入，执行结果可以按回车获得\n";
	  help +="2.进行2，8，10，16进制的各种运算以及相互转换，16进制没有实现a，b，c，d，e，f的输入\n";
	  help +="3.进行大整数运算\n4.进行批量运算";
		 area = new TextArea(help,10,50,3);
		//area.setEnabled(false);
		 area.setForeground(Color.BLUE);
		area.setFont(new Font("宋体",Font.BOLD,16));
		 add(area);
      add(yes); add(no);
	  yes.setPreferredSize(new Dimension(100,25));
	  no.setPreferredSize(new Dimension(100,25));
      setBounds(300,300,500,300);
      addWindowListener(new WindowAdapter()
                      {   public void windowClosing(WindowEvent e)
                           { message=-1;setVisible(false);
                           }
                      }
                   );
   }
   public void actionPerformed(ActionEvent e)
   {  if(e.getSource()==yes) 
      { message=YES;setVisible(false);
      }
     else if(e.getSource()==no)
      { message=NO;setVisible(false);
      }
   }
   public int getMessage()
   {  return message;
   }
}
