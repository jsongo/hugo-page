import os
import shutil
from datetime import datetime
import pytz

def convert_date_format(date_str):
    """
    将 "Mon, Dec 16th, 2024 - 13:39:37" 格式转换为 "2024-10-27T11:31:09.698+08:00" 格式
    """
    try:
        # 移除序数词后缀（1st, 2nd, 3rd, 4th 等）
        date_str = date_str.replace('st,', ',').replace('nd,', ',').replace('rd,', ',').replace('th,', ',')
        
        # 解析输入的日期时间字符串
        dt = datetime.strptime(date_str, "%a, %b %d, %Y - %H:%M:%S")
        
        # 设置时区为 UTC+8
        tz = pytz.timezone('Asia/Shanghai')
        dt = tz.localize(dt)
        
        # 转换为目标格式
        return dt.isoformat()
    except Exception as e:
        print(f"Error converting date: {e}")
        return date_str

def process_public_folder():
    """处理当前目录中的 .md 文件"""
    # 获取当前目录下所有的 .md 文件
    md_files = [f for f in os.listdir('.') if f.endswith('.md')]
    
    for md_file in md_files:
        with open(md_file, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        # 查找文件中的日期并转换
        in_frontmatter = False
        frontmatter_count = 0
        modified_lines = []
        date_added = False
        
        for line in lines:
            modified_lines.append(line)
            
            # 检查是否在 frontmatter 区域内
            if line.strip() == '---':
                frontmatter_count += 1
                in_frontmatter = frontmatter_count == 1
                continue
            
            # 在 frontmatter 中查找 created_at
            if in_frontmatter and frontmatter_count == 1 and line.startswith('created_at:'):
                # 提取并转换日期
                date_str = line.replace('created_at:', '').strip()
                converted_date = convert_date_format(date_str)
                # 在下一行添加转换后的日期
                modified_lines.append(f'date: {converted_date}\n')
                date_added = True
        
        # 只有在实际进行了修改时才写入文件
        if date_added:
            with open(md_file, 'w', encoding='utf-8') as f:
                f.writelines(modified_lines)
            print(f"Processed {md_file}")

if __name__ == "__main__":
    # 测试日期转换
    # test_date = "Mon, Dec 16th, 2024 - 13:39:37"
    # converted = convert_date_format(test_date)
    # print(f"Original: {test_date}")
    # print(f"Converted: {converted}")
    
    process_public_folder() 