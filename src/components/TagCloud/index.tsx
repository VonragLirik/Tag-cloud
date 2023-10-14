// @ts-nocheck

import { useLayoutEffect, useState, useEffect } from 'react';

import { Box, Input, Button } from '@mui/material';
import { TagCloud } from 'react-tagcloud';
import TagCloudFunction, { TagCloudOptions } from 'TagCloud';

import './index.css';

const inlineTagsConfig: TagCloudOptions = {
  radius: 300,
  maxSpeed: 'fast',
  initSpeed: 'normal',
};

const customRenderer = (tag, size, color) => (
  <span
    key={tag.value}
    style={{
      animation: 'blinker 3s linear infinite',
      animationDelay: `${Math.random() * 2}s`,
      fontSize: `${size}px`,
      border: `2px solid ${color}`,
      margin: '3px',
      padding: '3px',
      color: 'white',
      width: 'fit-content',
    }}
  >
    {tag.value} - {tag.count}
  </span>
);

const renderTags = setInlineTagsArray => {
  // Получаем HTML-код текущей страницы из объекта window
  const html = window.document.documentElement.outerHTML;

  // Создаем временный div-элемент для парсинга HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Получаем все дочерние элементы внутри временного div
  const elements = tempDiv.querySelectorAll('*');

  // Инициализируем объект для подсчета тегов
  const tagCounts = {};

  // Итерируемся по всем дочерним элементам и увеличиваем счетчик для каждого тега
  elements.forEach(element => {
    const tagName = element.tagName.toLowerCase();
    if (tagName !== 'style') {
      tagCounts[tagName] = (tagCounts[tagName] || 0) + 1;
    }
  });

  // Преобразуем объект в массив объектов [{ name, count }]
  const tagList = Object.keys(tagCounts)
    .map(tagName => ({
      value: tagName,
      count: tagCounts[tagName],
    }))
    .sort((a, b) => b.count - a.count);

  setInlineTagsArray(tagList);
};

export const TagCloudComponent = () => {
  const [inlineTagsArray, setInlineTagsArray] = useState([]);
  const [newTagName, setNewTagName] = useState('');
  const [sphereTagsEntity, setSphereTagsEntity] = useState(null);

  useLayoutEffect(() => {
    renderTags(setInlineTagsArray);
  }, []);

  useEffect(() => {
    if (inlineTagsArray.length > 0) {
      const texts = inlineTagsArray.map(item => item.value);

      if (sphereTagsEntity) {
        sphereTagsEntity.update(texts);
      } else {
        setSphereTagsEntity(
          TagCloudFunction('.sphereTag', texts, inlineTagsConfig),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inlineTagsArray]);

  const addNewtag = () => {
    if (newTagName !== '') {
      const newElement = document.createElement(newTagName);

      // Устанавливаем его текстовое содержимое:
      newElement.style.display = 'none';

      // Добавляем новый элемент в DOM:
      document.body.appendChild(newElement);

      renderTags(setInlineTagsArray);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      {inlineTagsArray.length > 0 && (
        <Box
          width="100%"
          display="flex"
          justifyContent="center"
          mb="50px"
          flexWrap="wrap"
        >
          <TagCloud
            minSize={18}
            maxSize={35}
            tags={inlineTagsArray}
            renderer={customRenderer}
          />
        </Box>
      )}

      <span className="sphereTag" />

      <Box
        mt="16px"
        backgroundColor="white"
        width="100%"
        border="1px solid white"
        padding="16px"
        display="flex"
        gap="20px"
      >
        <Input
          placeholder="Введите имя тэга"
          value={newTagName}
          size="medium"
          onChange={e => setNewTagName(e.target.value)}
        />

        <Button onClick={addNewtag}>Добавить на страницу</Button>
      </Box>
    </Box>
  );
};
