import java.util.*;
import java.awt.*;
import javax.swing.*;
class mypanel extends Panel//派生一个面板，用来实现不同面板的布局
{
    GridLayout grid;
     JButton btu[];
    mypanel(String []btuName,int row,int col,Color c)
    {
       btu =  new JButton [btuName.length];
       grid = new GridLayout(row,col,1,1);
       setLayout(grid);
       for(int i=0;i<row;i++)
           for(int j=0;j<col;j++)
           {
               if(i*col+j<btuName.length)
               {
                   btu[i*col+j] = new JButton(btuName[i*col+j]);
                   btu[i*col+j].setForeground(c);
                   add(btu[i*col+j]);
				   btu[i*col+j].setPreferredSize(new Dimension(60,25));
               }
               else
                   break;
            }
             
       }

    
}